import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { motion } from 'framer-motion';

type TopMessageProps = {
  text: string;
  className?: string;
} & VariantProps<typeof variants>;

const variants = cva('mb-4 w-full rounded-md py-1 text-center text-xs', {
  variants: {
    variant: {
      success:
        'bg-emerald-50 text-emerald-500 dark:bg-accent dark:text-primary',
      loading:
        'bg-primary-50 text-primary-600 dark:bg-accent dark:text-primary',
      error: 'text-white bg-red-500',
    },
  },
  defaultVariants: { variant: 'success' },
});

const TopMessage = ({ text, className, variant }: TopMessageProps) => {
  return (
    <motion.div
      className={cn(variants({ className, variant }))}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {text}
    </motion.div>
  );
};

export default TopMessage;
