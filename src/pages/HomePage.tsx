// import { getListProduct } from "@/services/apiServices"
// import { useProductStore } from "@/store/ProductStore"
// import { Product } from "@/types"
// import { Card, CardBody, CardFooter, Image, Pagination, Spinner } from "@nextui-org/react"
// import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"
// import { useNavigate } from "react-router"

const HomePage = () => {

    // const [currentPage, setCurrentPage] = useState(1)
    // const [pageSize, setPageSize] = useState(8)



    // const { data, isFetching, isPending, isLoading } = useQuery({
    //     queryKey: ['fetchingProduct', currentPage, pageSize],
    //     queryFn: async () => {
    //         const res = await getListProduct(currentPage, pageSize)
    //         return res.data.data
    //     }
    // })

    // const navigate = useNavigate();

    // if (isLoading) {
    //     return (
    //         <Spinner size="lg" />
    //     )
    // }

    // if (isFetching) {
    //     return (
    //         <Spinner size="lg" />
    //     )
    // }

    return (
        // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        //     <div className="inline-block w-full text-center justify-center">
        //         <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 flex flex-col w-full">
        //             {data?.res && data?.res?.length > 0 && data?.res.map((item: Product, index: number) => (
        //                 <Card shadow="sm" key={index} isPressable onPress={() => navigate(`/order/${item?._id}`)} >
        //                     <CardBody className="overflow-visible p-0 flex flex-col justify-center align-center w-full">
        //                         <Image
        //                             shadow="sm"
        //                             radius="lg"
        //                             width="100%"
        //                             alt={item?.name}
        //                             className="w-2/3 object-cover h-9/10"
        //                             src={item?.image}
        //                         />
        //                     </CardBody>
        //                     <CardFooter className="text-small justify-between">
        //                         <b>{item?.name}</b>
        //                         <p className="text-default-500">{item?.price}</p>
        //                     </CardFooter>
        //                 </Card>
        //             ))}
        //         </div>
        //         <div className="flex justify-end pt-2">
        //             <Pagination total={data?.pageInfo?.totalPage} color='danger' onChange={(page: number) => setCurrentPage(page)} />
        //         </div>
        //     </div>
        // </section>
        <div>
            Hello world fron homepage
        </div>
    )
}

export default HomePage