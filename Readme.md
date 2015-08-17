## Development
```bash
npm install
bower install
grunt serve
```

## Production
```bash
mkdir -p /var/www/festinare
grunt build
sudo cp dist -r /var/www/festinare
```

## Errors

### ENOSPC
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
