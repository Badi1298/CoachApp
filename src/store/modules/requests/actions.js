export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(
      `https://vue-http-demo-fbb57-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    if (!res.ok) {
      const error = new Error(data.message || 'Failed to send request');
      throw error;
    }

    const data = await res.json();

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const res = await fetch(
      `https://vue-http-demo-fbb57-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Failed to fetch request');
      throw error;
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
