import InputCustom from '@/components/custom/Input'
import UploadCustom from '@/components/custom/Upload'
import { createNewQuiz } from '@/services/quizService'
import { useAuthStore } from '@/store/AuthStore'
import { QuizValue } from '@/types/Data/Quiz'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'


const AddNewQuiz = () => {

    const { handleSubmit, control } = useForm<QuizValue>()
    const navigate=useNavigate()
    const { user } = useAuthStore()

    const CreateQuiz = useMutation({
        mutationFn: async (data: QuizValue) => {
            await createNewQuiz(data)
        },
        onSuccess: ()=>{
            navigate('/dashboard/quiz/viewall')
        }
    })
    const onSubmit = (data: QuizValue) => {
        CreateQuiz.mutate({ ...data, teacherId: user?._id })
    };
    return (
        <div className="overflow-hidden">
            <div className="">
                <h1 className="font-medium text-4xl text-[#0369a1]">Add New Quiz</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <InputCustom control={control} name="name" label="Name of quiz" />
                <InputCustom control={control} name="description" label="Description" />
                <InputCustom control={control} name="level" label="level" />
                <UploadCustom control={control} name="image" />
                <div className="flex flex-row justify-end gap-3 items-center">
                    <Button type="submit" color="primary">
                        Create
                    </Button>

                    <Button color="secondary" onClick={()=>navigate('/dashboard/quiz/viewall')}>
                        Return
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewQuiz