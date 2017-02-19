import context from '../../Database/ContextInstance';
import './Captalize';

function remove(model) {
  const singular = model.singular;
  return (id) =>
    new Promise((resolve, reject) => {
      context.User.findById(id).then(data => {
        if (data) {
          data.remove().then(updated => {
            resolve({
              id
            });
          }).catch(err => {
            reject({
              status: 500,
              message: `Server error while removing ${singular.toLowerCase()}`
            });
          });
        } else {
          reject({
            status: 404,
            message: `${singular.capitalize()} not found`
          });
        }
      }).catch((err) => {
        console.log('remove:', err);
        reject({
          status: 500,
          message: `Server error while getting ${singular.toLowerCase()}`
        });
      });
    });
}

export default remove;
