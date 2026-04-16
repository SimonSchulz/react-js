import SkeletonCard from './SkeletonCard'

export default function SkeletonList({limit}) {
    return Array.from({ length: limit }).map((_, i) => (
        <SkeletonCard key={i} />
    ))
}