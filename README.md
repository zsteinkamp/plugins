## plugins

This is a Next.js app that displays a nice interface to browse and download my Ableton Live plugins.

For each project listed in `data/plugins.yaml`, it pulls `README.md` and release data from GitHub's API and caches it locally for display.

## Production Mode

Run `make prod` to start the server. It will be listening on port 3225.

## Developing

I develop in this repo using a VSCode DevContainer.

With the container running, you can visit [http://localhost:3200](http://localhost:3200) with your browser to see the current code.

You can run `make help` to see other makefile targets and what they do.