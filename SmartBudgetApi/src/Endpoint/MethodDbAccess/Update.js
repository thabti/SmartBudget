import context from '../../Database/ContextInstance';
import './Captalize';

function update(model) {
  const singular = model.singular,
    plural = model.plural;
  return (id, newData) =>
    new Promise((resolve, reject) => {
      context[singular].findById(id).then(data => {
        if (data) {
          const keys = Object.keys(newData).filter(key => key !== 'id');
          keys.forEach(key => {
            data[key] = newData[key] || newData[key] === null ? newData[key] : data[key];
          });
          data.save().then(updated => {
            resolve({
              id: updated.id
            });
          }).catch(err => {
            reject({
              status: 500,
              message: `Server error while updating ${singular.toLowerCase()}`
            });
          });
        } else {
          reject({
            status: 404,
            message: `${singular.capitalize()} not found`
          });
        }
      }).catch((err) => {
        console.log('put:', err);
        reject({
          status: 500,
          message: "Server error while getting ${singular.toLowerCase()}"
        });
      });
    });
}

export default update;
