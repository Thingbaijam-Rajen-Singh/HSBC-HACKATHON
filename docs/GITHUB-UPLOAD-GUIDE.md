# Upload this project to GitHub

## Before uploading

1. Copy `.env.example` to `.env` only on your computer and add your own credentials if needed. Do not upload `.env`.
2. Open a terminal in the repository folder and run `git status --short` after staging. Make sure `.env`, API keys, and service-account JSON files are not listed as files to commit.
3. The exported Firebase project configuration has been removed. Use your own Firebase project if you need cloud authentication and persistence.

## Upload with Git

Create a new, empty repository on GitHub. Then run these commands from this folder, replacing the remote URL with your repository's URL:

```bash
git init
git add .
git status --short
git commit -m "Organize SkillBridge project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If Git reports that no user name or email is configured, set them using `git config --global user.name` and `git config --global user.email` before committing.

## Upload with GitHub Desktop

You can also open this extracted folder in GitHub Desktop, choose **Add an Existing Repository** or **Create a Repository**, review the changed files, commit, and publish the repository. Keep `.env` out of the commit even if you use the desktop app.
