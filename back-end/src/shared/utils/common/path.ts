import { basename, extname, isAbsolute, join, resolve } from 'path'

let rootPath: string

function root () {
  if (rootPath) return rootPath

  rootPath = process.cwd()

  return rootPath
}

function buildPath (path: string) {
  if (isAbsolute(path)) return path

  return join(root(), path)
}

function getLowercaseExtension (filename: string) {
  const ext = extname(filename) || ''

  return ext.toLowerCase()
}

function buildAbsoluteFixturePath (path: string, customCIPath = false) {
  if (isAbsolute(path)) return path

  if (customCIPath && process.env.GITHUB_WORKSPACE) {
    return join(process.env.GITHUB_WORKSPACE, 'fixtures', path)
  }

  return join(root(), 'server', 'tests', 'fixtures', path)
}

export {
  root,
  buildPath,
  buildAbsoluteFixturePath,
  getLowercaseExtension
}
