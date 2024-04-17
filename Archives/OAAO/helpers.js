function getResizeUrl(image, options) {
  if (
    (!image?.filename || !image?.source) ||
    (!options.width && !options.height)
  ) {
    return image
  }

  if (image.filename.includes('.svg')) {
    return image.filename
  }

  if (image.source === 'pexels') {
    let url = image.filename
    const params = []

    if (options.crop) {
      params.push(`fit=crop`);
    }

    if (options.width) {
      params.push(`w=${options.width}`);
    }

    if (options.height) {
      params.push(`h=${options.height}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return url
  }

  if (image.source === 'sitesgpt') {
    const inputString = image.filename
    const lastIndex = inputString.lastIndexOf('/')
    let path = inputString.substring(0, lastIndex)
    let filename = inputString.substring(lastIndex + 1)
    filename = encodeURIComponent(filename)

    const width = options.width ?? options.height
    const height = options.height ?? options.width

    if (!options.crop) {
      path += '/fit-in'
    }

    path += `/${width}x${height}`

    return `${path}/${filename}`
  }

  return image.filename
}

function themeColors(theme) {
  const colors = {}

  switch(theme) {
    case 'dark':
      colors.background = 'bg-gray-900';
      colors.text = 'text-gray-100';
      colors.text_light = 'text-gray-300';
      break;
    case 'medium':
      colors.background = 'bg-gray-100';
      colors.text = 'text-gray-900';
      colors.text_light = 'text-gray-700';
      break;
    case 'brand-primary':
      colors.background = 'bg-brand-primary';
      colors.text = 'text-white';
      colors.text_light = 'text-gray-100';
      break;
    case 'brand-secondary':
      colors.background = 'bg-brand-secondary';
      colors.text = 'text-white';
      colors.text_light = 'text-gray-100';
      break;
    case 'brand-accent':
      colors.background = 'bg-brand-accent';
      colors.text = 'text-white';
      colors.text_light = 'text-gray-100';
      break;
    default:
      colors.background = 'bg-white';
      colors.text = 'text-gray-900';
      colors.text_light = 'text-gray-700';
  }

  return colors
}