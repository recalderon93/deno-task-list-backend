export interface Board {
  id: string;
  title: string;
  ownerId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBoardInput {
  title: string;
  ownerId: string;
  createdBy: string;
}

export interface UpdateBoardTitleInput {
  title: string;
}

export interface ChangeBoardOwnershipInput {
  newOwnerId: string;
}
