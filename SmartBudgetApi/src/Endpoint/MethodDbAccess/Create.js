import context from '../../Database/ContextInstance';
import './Captalize';

function create(model) {
  const singular = model.singular,
    plural = model.plural;
  return (newData) =>
    new Promise((resolve, reject) => {
      const newModel = context[singular].$parse(newData);
      newModel.save().then(data => {
        resolve({
          id: data.id
        });
      }).catch((err) => {
        console.log('post:', err);
        reject({
          status: 500,
          message: "Server error while creating a ${singular.toLowerCase()}"
        });
      });
    });
}

export default create;
