import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  // res.cookie('jwt', token, {
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   path: '/',
  //   secure: true,
  //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  // })
  res.cookie('jwt', token, {
    httpOnly: false,
  })
  return token
}

export default generateToken
