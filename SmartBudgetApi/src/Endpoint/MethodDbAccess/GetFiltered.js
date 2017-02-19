import context from '../../Database/ContextInstance';
import './Captalize';

function getFiltered(model) {
  const singular = model.singular,
    plural = model.plural;
  return (filter) =>
    new Promise((resolve, reject) => {
      filter(context[singular].find()).then(allData => {
        if (allData.length) {
          resolve(allData);
        } else {
          reject({
            status: 404,
            message: `${plural.capitalize()} not found`
          });
        }
      }).catch((err) => {
        console.log('getFiltered:', err);
        reject({
          status: 500,
          message: "Server error while getting ${plural.toLowerCase()}"
        });
      });
    });
}

export default getFiltered;
