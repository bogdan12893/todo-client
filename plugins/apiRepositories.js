import createRepository from '~/repositories/index'

export default ({ $axios }, inject) => {
  inject('repositories', createRepository($axios))
}
