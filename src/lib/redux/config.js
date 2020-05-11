import Immutable, { Map } from 'immutable'

export { redux as projects } from '@obsidians/project'

export const version = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    SET_VERSION: {
      reducer: (state, { payload }) => state.merge(payload)
    },
  }
}

export const profile = {
  default: Map({}),
  persist: true,
  actions: {
    SET_USER_PROFILE: {
      reducer: (state, { payload }) => state.merge(payload)
    },
    CLEAR_USER_PROFILE: {
      reducer: () => Map({})
    },
  }
}

export const globalConfig = {
  default: Immutable.fromJS({}),
  persist: true,
  actions: {
    UPDATE_GLOBAL_CONFIG: {
      reducer: (state, { payload }) => state.merge(payload)
    },
  }
}

export const network = {
  default: 'local',
  persist: false,
  actions: {
    SELECT_NETWORK: {
      reducer: (_, { payload }) => payload
    },
  }
}
