export default {
  add: async (jobName, data) => {
    console.log("📨 JOB ADDED:", jobName);
    setTimeout(() => { console.log("✅ EMAIL SENT:", data); }, 1000);
  },
};