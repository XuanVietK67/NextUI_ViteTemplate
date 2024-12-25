import { Card, Skeleton } from "@nextui-org/react";

const Loading=()=>{
    return (
        <Card className="w-full h-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-[30vh] rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-[5vh] w-full rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-[5vh] w-full rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-[5vh] w-full rounded-lg bg-default-300" />
                </Skeleton>
            </div>
        </Card>
    );
}

export default Loading