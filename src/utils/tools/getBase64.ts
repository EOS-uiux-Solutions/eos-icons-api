const getBase64 = (svgString: string) => {
  const base64String = Buffer.from(svgString).toString('base64')
  return base64String
}

export default getBase64
