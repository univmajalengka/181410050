const { RouterOSClient } = require("routeros-client");

const createUserHotspot = async (username, password, profile, time_limit) => {
  const api = new RouterOSClient({
    host: process.env.MIKROTIK_HOST,
    user: process.env.MIKROTIK_USER,
    password: process.env.MIKROTIK_PASSWORD,
  });

  try {
    const client = await api.connect();
    const hotspotUserMenu = client.menu("/ip hotspot user");
    const response = await hotspotUserMenu.add({
      name: username,
      password: password,
      profile: profile,
      "limit-uptime": time_limit,
    });
    await api.close();
    return response;
  } catch (error) {
    console.error("❌ Gagal membuat user di Mikrotik:", error);
    await api.close();
    return null;
  }
};

module.exports = { createUserHotspot };
