const categoryZipPath = (category: string) => {
  return `/zip/zs-m4l-${category.replaceAll(' ', '')}.zip`
}

export {
  categoryZipPath,
}