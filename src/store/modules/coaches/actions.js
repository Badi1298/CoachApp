export default {
  async registerCoach(context, payload) {
    try {
      const userId = context.rootGetters.userId;
      const coachData = {
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas,
      };

      const token = context.rootGetters.token;

      const res = await fetch(
        `https://vue-http-demo-fbb57-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );

      if (!res.ok) return;

      context.commit('registerCoach', {
        ...coachData,
        id: userId,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async loadCoaches(context, refresh) {
    if (!refresh && !context.getters.shouldUpdate) return;

    const res = await fetch(
      `https://vue-http-demo-fbb57-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const data = await res.json();

    if (!res.ok) {
      const err = new Error(data.message || 'Failed to fetch coaches');
      throw err;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        areas: data[key].areas,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
      };

      coaches.push(coach);
    }

    context.commit('loadCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
