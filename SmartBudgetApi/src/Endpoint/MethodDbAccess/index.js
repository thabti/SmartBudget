import GetAllFactory from './GetAll';
import GetFilteredFactory from './GetFiltered';
import GetOneFactory from './GetOne';
import CreateFactory from './Create';
import UpdateFactory from './Update';
import RemoveFactory from './Remove';

export { GetAllFactory };
export { GetFilteredFactory };
export { GetOneFactory };
export { CreateFactory };
export { UpdateFactory };
export { RemoveFactory };

function getModelDbAccess(model) {
  return {
    getAll: GetAllFactory(model),
    getFiltered: GetFilteredFactory(model),
    getOne: GetOneFactory(model),
    create: CreateFactory(model),
    update: UpdateFactory(model),
    remove: RemoveFactory(model)
  };
}

export default getModelDbAccess;
