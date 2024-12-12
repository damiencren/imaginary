import { Skeleton } from "./ui/skeleton";

const SkeletonImageGrid = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, resourceIdx) => (
                <Skeleton key={resourceIdx} className="w-full h-[400px] rounded-lg" />
            ))}
        </div>
    );
}

export default SkeletonImageGrid