import path from "path"
import { root } from "../utils"


const MOVIE_PATH = path.join(root(), 'movie')
const FFMPEG_PATH = path.join(root(), 'libs\\ffmpeg\\bin\\ffmpeg.exe')
const MAX_BYTES_PER_SECOND = 2000000


export {
    MOVIE_PATH,
    FFMPEG_PATH,
    MAX_BYTES_PER_SECOND,
}