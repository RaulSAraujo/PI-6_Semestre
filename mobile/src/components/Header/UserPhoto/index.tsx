import { useEffect, useState } from 'react';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { UserPhotos } from '@dtos/UserDTO';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';
import { Avatar, Skeleton } from '@rneui/themed';

export const UserPhoto = () => {
  const { user } = useAuth();

  return (
    <Avatar
      rounded
      size="medium"
      title={user?.name.substring(0, 2)}
      containerStyle={{ backgroundColor: '#2196F3' }}
    />
  );
};
