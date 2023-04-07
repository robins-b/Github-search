const form = document.getElementById("search-form");
const input = document.getElementById("username-input");
const userInfo = document.getElementById("user-info");

const getUserData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

const getUserRepos = async (username) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

const displayUserInfo = (userData, reposData) => {
  const userReposCount = reposData.length;
  const userFollowers = userData.followers;

  userInfo.innerHTML = `
      <div class="max-w-[300px] p-[20px] rounded-md shadow-md text-center">
        <img class="max-w-full rounded-full mb-[20px]" src="${
          userData.avatar_url
        }" alt="${userData.name} profile picture" />
        <h2 class="text-white font-semibold text-lg">${userData.name}</h2>
        <p class="text-white">${userData.bio}</p>
      </div>
      <div class="max-w-[300px] p-[20px] rounded-md shadow-md flex">
      <div class="m-auto">
        <h3 class="text-white font-semibold text-lg">Repositories</h3>
        <p class="text-white">${userReposCount}</p>
      </div>
      </div>
      <div class="max-w-[300px] p-[20px] rounded-md shadow-md flex">
      <div class="m-auto">
        <h3 class="text-white font-semibold text-lg">Followers</h3>
        <p class="text-white">${userFollowers}</p>
      </div>
      </div>
      <div class="max-w-[300px] p-[20px] rounded-md shadow-md flex">
      <div class="m-auto">
        <h3 class="text-white font-semibold text-lg">Location</h3>
        <p class="text-white">${userData.location || "Not available"}</p>
      </div>
      </div>
      <div class="max-w-[300px] p-[20px] rounded-md shadow-md flex ">
      <div class="m-auto">
        <h3 class="text-white text-lg font-semibold">Website</h3>
        <p class="text-white ">${userData.blog || "Not available"}</p>
        </div>
      </div>
    `;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = input.value.trim();
  if (username) {
    try {
      const userData = await getUserData(username);
      const reposData = await getUserRepos(username);
      displayUserInfo(userData, reposData);
    } catch (error) {
      userInfo.innerHTML = `<p>${error.message}</p>`;
    }
  }
});
