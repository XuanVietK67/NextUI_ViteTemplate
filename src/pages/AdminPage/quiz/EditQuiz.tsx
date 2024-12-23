import { getQuizDetail, updateQuiz } from '@/services/quizService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import InputCustom from "@/components/custom/Input";
import { dataUpdateQuiz, Question, QuizValue } from '@/types/Data/Quiz';
import UploadCustom from '@/components/custom/Upload';
import { Button } from '@nextui-org/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useState } from 'react';
import { Checkbox, GetProp, Input, Upload, UploadProps } from 'antd';

let quizSchema = object({
    name: string().required("name is not empty"),
    description: string().required("description cannot be empty"),
    image: string(),
    level: string(),
    teacherId: string(),
    _id: string()
});

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};



const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
        <div style={{ marginTop: 8, padding: '0' }}>Upload</div>
    </button>
);

const EditQuiz = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [questions, setQuestions] = useState<Array<Question>>([{ description: "", answers: [{ description: "", correctAnswer: false }] }])

    const { data } = useQuery({
        queryKey: ['quiz', id],
        queryFn: async () => {
            const res = await getQuizDetail(id ? id : "")
            if (res?.data?.data?.questions?.length > 0) {
                setQuestions(res?.data?.data?.questions)
            }
            return res?.data?.data
        }
    })

    const UpdateQuiz = useMutation({
        mutationFn: async (data: dataUpdateQuiz) => {
            await updateQuiz(id ? id : "", data)
        },
        onSuccess: () => {
            navigate('/dashboard/quiz/viewall')
        }
    })


    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: "",
            image: "",
            description: "",
            level: "",
            teacherId: "",
            _id: ""
        },
        values: {
            ...data
        },
        resolver: yupResolver(quizSchema),
        mode: "all",
    })


    const handleChangeQuestionDescription = (event: any, index: number) => {
        // console.log("check on change: ",event.target.value,index)
        let contain = questions[index] as any
        let questionCoppy = questions as any
        (contain as any).description = event.target.value
        // console.log("check contain: ",contain)
        questionCoppy[index] = contain
        setQuestions([...questionCoppy])
    }

    const handleChangeAnswerDescription = (event: any, index: number, answerIndex: number) => {
        let contain = questions[index] as any
        let questionsCoppy = questions as any
        (contain as any).answers[+answerIndex].description = event.target.value
        questionsCoppy[index] = contain
        setQuestions([...questionsCoppy])
    }

    const onChange = (e: any, index: number, answerIndex: number) => {
        // console.log(`checked = ${e.target.checked}`, index, answerIndex);
        let contain = questions[index] as any
        let questionsCoppy = questions as any
        (contain as any).answers[+answerIndex].correctAnswer = e.target.checked ? "true" : "false"
        questionsCoppy[index] = contain
        setQuestions([...questionsCoppy])
    };


    const handleChangeQuestionImage = async (event: any, index: number) => {
        let questionsCoppy = questions
        let contain = questions[index]
        getBase64(event.file.originFileObj as FileType, (url) => {
            contain.image = url
            questionsCoppy[index] = contain
            setQuestions([...questionsCoppy])
        });
    }

    const handleDeleteQuestion = (index: number) => {
        let questionsCoppy = questions
        questionsCoppy.splice(index, 1)
        setQuestions([...questionsCoppy])
    }


    const handleDeleteAnswer = (qIndex: number, answerIndex: number) => {
        let questionsCoppy = questions
        questionsCoppy[qIndex].answers.splice(answerIndex, 1)
        setQuestions([...questionsCoppy])
    }



    const handleAddQuestion = () => {
        const ques: Question = {
            description: "",
            answers: [{ description: "", correctAnswer: false }]
        }
        setQuestions([...questions, ques])
    }


    const handleAddAnswer = (qIndex: number) => {
        let contain = questions[qIndex] as any
        const answer = {
            description: '',
            correctAnswer: false
        }
        contain.answers = [...contain.answers, answer]
        let questionCoppy = questions as any
        questionCoppy[qIndex] = contain
        setQuestions([...questionCoppy])
    }


    const onSubmit = (dataa: dataUpdateQuiz) => {
        const { image, description, level, name } = dataa
        const dataUpdate = { image, description, level, name, questions }
        console.log("check dataa: ", dataUpdate)
        UpdateQuiz.mutate(dataUpdate)
        // console.log("check questionsss: ", questions)
    };


    // console.log("check quiz: ", data)
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-4"
        >
            <InputCustom<QuizValue> control={control} name="name" label="Name" />

            <InputCustom<QuizValue>
                control={control}
                name="description"
                placeholder="Description"
                label="Description"
            />
            <InputCustom<QuizValue> control={control} name="level" label="Level" />

            <UploadCustom control={control} name="image" />

            <div>
                {
                    questions && questions.length > 0
                    && questions.map((question: Question, index: number) => {
                        return (
                            <div key={index}>
                                <fieldset style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '2vw',
                                    fontSize: '1.5vw',
                                    fontWeight: '200',
                                    padding: '2vw',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1vh'
                                }}>
                                    <legend>Questions {index + 1}</legend>
                                    <div style={{
                                        marginTop: '1vh',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '1vw'
                                    }}>
                                        <Input
                                            style={{
                                                maxWidth: '50vw'
                                            }}
                                            value={question?.description}
                                            onChange={(event) => handleChangeQuestionDescription(event, index)}
                                            placeholder="Questions description"
                                        />
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={(event) => handleChangeQuestionImage(event, index)}
                                            style={{
                                                padding: '0'
                                            }}
                                        >
                                            {question?.image ? <img src={question.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>

                                        <span style={{
                                            fontSize: '1.5vw',
                                            color: '#0de7ba',
                                            cursor: 'pointer',

                                        }}>
                                            <Button color='primary'
                                                onClick={() => handleAddQuestion()}
                                            >
                                                Add Question
                                            </Button>
                                        </span>
                                        <span style={{
                                            fontSize: '1.5vw',
                                            color: '#a50505',
                                            cursor: 'pointer',

                                        }}>
                                            {questions && questions.length > 1 ?
                                                <Button color='danger' variant="solid" onClick={() => handleDeleteQuestion(index)}>
                                                    Delete Questions
                                                </Button>
                                                :
                                                ""
                                            }
                                        </span>
                                    </div>
                                    {
                                        question?.answers && question.answers.length > 0 &&
                                        question.answers.map((answer: any, answerIndex: number) => {
                                            return (
                                                <div style={{
                                                    paddingLeft: '2vw',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '1vh'
                                                }}
                                                    key={`${index}-${answerIndex}`}
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        gap: '1vh'
                                                    }}>
                                                        <Checkbox
                                                            onChange={(event) => onChange(event, index, answerIndex)}
                                                            checked={answer.correctAnswer == "true" ? true : false}
                                                        >
                                                            <Input placeholder="Answer description"
                                                                style={{
                                                                    minWidth: '40vw'
                                                                }}
                                                                value={answer.description}
                                                                onChange={(event) => handleChangeAnswerDescription(event, index, answerIndex)}
                                                            />
                                                        </Checkbox>
                                                        < span style={{
                                                            fontSize: '1.5vw',
                                                            color: '#0de7ba',
                                                            cursor: 'pointer',

                                                        }}>
                                                            <Button
                                                                color='primary'
                                                                onClick={() => handleAddAnswer(index)}
                                                            >
                                                                Add Answer
                                                            </Button>
                                                        </span >
                                                        <span style={{
                                                            fontSize: '1.5vw',
                                                            color: '#a50505',
                                                            cursor: 'pointer',

                                                        }}>
                                                            {question && question.answers.length > 1 ?
                                                                <Button
                                                                    color='danger'
                                                                    variant="solid"
                                                                    onClick={() => handleDeleteAnswer(index, answerIndex)}
                                                                >
                                                                    Delete Answer
                                                                </Button>
                                                                :
                                                                ""
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </fieldset>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-end gap-3">
                <Button
                    color="secondary"
                    onClick={() => navigate("/dashboard/quiz/viewall")}
                >
                    Return
                </Button>
                <Button
                    color="primary"
                    type="submit"
                >
                    Update
                </Button>
            </div>
        </form>
    )
}

export default EditQuiz