import InputCustom from '@/components/custom/Input'
import UploadCustom from '@/components/custom/Upload'
import { Quiz } from '@/types/Data/Quiz'
import { Student, StudentValue } from '@/types/Data/Student'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'


const EditQuiz = () => {

    // const { handleSubmit, control } = useForm()
    const navigate = useNavigate()



    const onSubmit = (dataa: any) => {
        // console.log("check dataa: ",dataa)
        // const dataUpdate={name: dataa.name, image: dataa.image}
        // Update.mutate(dataUpdate as StudentValue);
    };
    return (
        <div></div>
        // <div className="overflow-hidden">
        //     <div className="">
        //         <h1 className="font-medium text-4xl text-[#0369a1]">
        //             Update Quiz
        //         </h1>
        //     </div>
        //     <form
        //         onSubmit={handleSubmit(onSubmit)}
        //         className="flex flex-col gap-12 mt-4"
        //     >
        //         <InputCustom<Student> control={control} name="email" action={'view'} label="Email" />

        //         <InputCustom<StudentValue>
        //             control={control}
        //             name="name"
        //             placeholder="student name"
        //             label="Name"
        //             // action={action}

        //         />
        //         <UploadCustom control={control} name="image" />

        //         <div className="flex justify-end gap-3">
        //             <Button
        //                 color="secondary"
        //                 onClick={() => navigate("/dashboard/student/viewall")}
        //             >
        //                 Return
        //             </Button>
        //             {action == "view" ? (
        //                 ""
        //             ) : (
        //                 <div>
        //                     <Button type="submit" color="danger">
        //                         Update
        //                     </Button>
        //                 </div>
        //             )}
        //         </div>
        //     </form>
        // </div>
    )
}

export default EditQuiz