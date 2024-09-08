interface HeadingProps {
    label: string,
    description: string
}

export const Heading = ({label, description}: HeadingProps) => {

    return (
        <div className="flex flex-col items-start m-4">
            <p className="text-2xl font-semibold ">{label}</p>
            <p className="text-zinc-400 dark:text-zinc-500">{description}</p>

        </div>
    )
}