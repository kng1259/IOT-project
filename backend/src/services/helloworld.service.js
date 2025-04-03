import * as helloworldRepo from '../repositories/helloworld.repo.js'

export const helloworld = async () => {
    return helloworldRepo.helloworld()
}
