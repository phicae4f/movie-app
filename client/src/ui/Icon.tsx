interface IconProps {
    className?: string,
    width: number,
    height: number,
    name: string
}

export const Icon = ({className="", width, height, name}: IconProps) => {
    return (
        <svg className={className} width={width} height={height} aria-hidden={true}>
            <use xlinkHref={`/sprite.svg#${name}`} />
        </svg>
    )
}