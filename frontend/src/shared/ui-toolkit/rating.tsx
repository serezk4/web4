import React from "react"
import { Star } from "lucide-react"
import {cn} from "@/shared/lib/utils";

const ratingVariants = {
    default: {
        star: "text-foreground",
        emptyStar: "text-muted-foreground",
        hoverStar: "text-light-foreground",
    },
    destructive: {
        star: "text-red-500",
        emptyStar: "text-red-200",
        hoverStar: "text-red-400",

    },
    yellow: {
        star: "text-yellow-500",
        emptyStar: "text-yellow-200",
        hoverStar: "text-yellow-400",
    },
}

interface RatingsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    totalStars?: number
    size?: number
    fill?: boolean
    Icon?: React.ReactElement
    variant?: keyof typeof ratingVariants
    defaultValue?: number
    onChange?: (rating: number) => void
}

const Ratings = ({ ...props }: RatingsProps) => {
    const {
        totalStars = 5,
        size = 20,
        fill = true,
        Icon = <Star />,
        variant = "default",
        defaultValue,
        onChange,
        className,
        ...otherProps
    } = props
    const [currentRating, setCurrentRating] = React.useState<number>(defaultValue || 0);
    const [hoverRating, setHoverRating] = React.useState<number>(0);
    const [isHovering, setIsHovering] = React.useState<boolean>(false);

    const fullStars = Math.floor(currentRating)
    const partialStar =
        currentRating % 1 > 0 ? (
            <PartialStar
                fillPercentage={currentRating % 1}
                size={size}
                className={cn(ratingVariants[variant].star)}
                Icon={Icon}
            />
        ) : null

    const handleContainerMouseEnter = () => {
        setIsHovering(true);
        setHoverRating(currentRating);
    }

    const handleContainerMouseLeave = () => {
        setIsHovering(false);
        setHoverRating(0);
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        const starIndex = parseInt(
            (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
        );
        setHoverRating(starIndex);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const starIndex = parseInt(
            (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
        );

        setCurrentRating(starIndex);
        onChange && onChange(starIndex);
        setHoverRating(0);
    };

    return (
        <div
            className={cn(className, "flex items-center gap-2")}
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
            {...otherProps}>
            {Array.from({ length: isHovering ? hoverRating : fullStars }).map((_, i) =>
                React.cloneElement(Icon, {
                    key: i,
                    size,
                    onMouseEnter: handleMouseEnter,
                    onClick: handleClick,
                    "data-star-index": i + 1,
                    className: cn(
                        fill ? "fill-current" : "fill-transparent",
                        isHovering ? ratingVariants[variant].hoverStar : ratingVariants[variant].star
                    ),
                })
            )}
            {partialStar}
            {Array.from({ length: totalStars - (isHovering ? hoverRating : fullStars) - ((!isHovering && partialStar) ? 1 : 0) }).map((_, i) =>
                React.cloneElement(Icon, {
                    key: i + fullStars + 1,
                    onMouseEnter: handleMouseEnter,
                    onClick: handleClick,
                    "data-star-index": i + (isHovering ? hoverRating : fullStars) + 1,
                    size,
                    className: cn(ratingVariants[variant].emptyStar),
                })
            )}
        </div>
    )
}

interface PartialStarProps {
    fillPercentage: number
    size: number
    className?: string
    Icon: React.ReactElement
}
const PartialStar = ({ ...props }: PartialStarProps) => {
    const { fillPercentage, size, className, Icon } = props

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {React.cloneElement(Icon, {
                size,
                className: cn("fill-transparent", className),
            })}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    overflow: "hidden",
                    width: `${fillPercentage * 100}%`,
                }}
            >
                {React.cloneElement(Icon, {
                    size,
                    className: cn("fill-current", className),
                })}
            </div>
        </div>
    )
}

export { Ratings }