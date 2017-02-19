import context from '../../Database/ContextInstance';
import './Captalize';

function getOne(model) {
  const singular = model.singular,
    plural = model.plural;
  return (id) =>
    new Promise((resolve, reject) => {
      context[singular].findById(id).then(data => {
        if (data) {
          resolve(data);
        } else {
          reject({
            status: 404,
            message: `${singular.capitalize()} not found`
          });
        }
      }).catch((err) => {
        console.log('getOne:', err);
        reject({
          status: 500,
          message: "Server error while getting ${singular.toLowerCase()}"
        });
      });
    });
}

export default getOne;
