import cs from 'classnames';
import { isArray } from 'lodash';

interface PageLoadingProps {
  className?: string;
}

function PageLoading({ className }: PageLoadingProps): JSX.Element {
  isArray([]);
  return (
    <div className={cs('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', className)}>
      Loading...
    </div>
  );
}

export default PageLoading;
