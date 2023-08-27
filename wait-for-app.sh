until curl -s http://172.25.0.3:3100/api; do
  echo "Waiting for the app to be ready..."
  sleep 1
done
echo "App is ready!"