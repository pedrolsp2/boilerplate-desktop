import { toast } from 'sonner';

type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

const toastVariants = {
  success: {
    style: { color: '#fff', background: '#3DA861' },
  },
  warning: {
    style: { color: '#fff', background: '#AE0303' },
  },
  info: {
    style: { color: '#fff', background: '#ffbb00' },
  },
};

export const Toast = ({
  variant,
  content,
  position = 'bottom-right',
}: {
  variant: 'success' | 'warning' | 'info';
  content: string;
  position?: Position;
}) => {
  toast(content, {
    position,
    ...toastVariants[variant],
  });
};
