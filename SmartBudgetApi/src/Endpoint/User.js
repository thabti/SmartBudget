import getModelDbAccess from './MethodDbAccess';
import { dataNotFound } from '../ResponseUtils';
import { getUrl } from '../RequestUtils';

const user = getModelDbAccess({
  singular: 'User',
  plural: 'Users'
});

function parseUser(user) {
  return {
    id: user.id,
    name: user.name,
    shortName: user.shortName,
    email: user.email,
    birthday: user.birthday,
    oauthId: user.oauthId,
    roles: user.roles
  };
}

function getAll(req, res) {
  if (req.owner.isAdmin) {
    user.getAll().then(allData => {
      res.json(allData.map(data => ({
        data: parseUser(data),
        link: {
          href: getUrl(req, data.id)
        }
      })));
    }).catch((err) => {
      res.status(err.status);
      res.json(err);
    });
  } else {
    return res.json([]);
  }
}

function getOne(req, res) {
  const { id } = req.params;
  if (req.owner.isAdmin || req.owner.id === id) {
    user.getOne(id).then(data => {
      res.json(parseUser(data));
    }).catch((err) => {
      res.status(err.status);
      res.json(err);
    });
  } else {
    dataNotFound(res, 'User');
  }
}

function post(req, res) {
  user.create(req.body).then(data => {
    res.status(201);
    res.json({
      id: data.id,
      link: {
        href: getUrl(req, data.id)
      }
    });
  }).catch((err) => {
    res.status(err.status);
    res.json(err);
  });
}

function put(req, res) {
  const { id } = req.params;
  if (req.owner.isAdmin || req.owner.id === id) {
    user.update(id, req.body).then(() => {
      res.status(204);
      res.json({
        id,
        link: {
          href: getUrl(req, data.id)
        }
      });
    }).catch((err) => {
      res.status(err.status);
      res.json(err);
    });
  } else {
    dataNotFound(res, 'User');
  }
}

function remove(req, res) {
  const { id } = req.params;
  if (req.owner.isAdmin || req.owner.id === id) {
    user.remove(id).then(() => {
      res.status(204);
      res.json({
        id
      });
    }).catch((err) => {
      res.status(err.status);
      res.json(err);
    });
  } else {
    dataNotFound(res, 'User');
  }
}

export { user };
export { parseUser };

export default {
  getAll,
  getOne,
  post,
  put,
  remove
};
