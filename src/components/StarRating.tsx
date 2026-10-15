import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-[${size}px] h-[${size}px] ${
            star <= Math.round(rating)
              ? 'text-[#F4B400] fill-[#F4B400]'
              : 'text-gray-300 dark:text-gray-600'
          }`}
          style={{ width: size, height: size }}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({rating})</span>
    </div>
  );
}
