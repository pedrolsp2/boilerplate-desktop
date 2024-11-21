import { getInitials } from '@/utils/stringFormatter';
import React from 'react';
import { Store, useStoreBase } from '@/store';

const stateSelector = (state: Store) => ({
  user: state.nome,
});

const BadgeUser: React.FC = () => {
  const { user } = useStoreBase(stateSelector);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full bg-primary">
        {getInitials(user || '')}
      </div>
      {user}
    </div>
  );
};

export default BadgeUser;
