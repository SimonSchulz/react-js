import SkeletonCard from './SkeletonCard'

export default function SkeletonList() {
    return Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
    ))
}