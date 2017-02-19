import context from '../../Database/ContextInstance';
import './Captalize';

function getAll(model) {
  const singular = model.singular,
    plural = model.plural;
  return () =>
    new Promise((resolve, reject) => {
      context[singular].find().then(allData => {
        if (allData.length) {
          resolve(allData);
        } else {
          reject({
            status: 404,
            message: `${plural.capitalize()} not found`
          });
        }
      }).catch((err) => {
        console.log('getAll:', err);
        reject({
          status: 500,
          message: "Server error while getting ${plural.toLowerCase()}"
        });
      });
    });
}

export default getAll;
