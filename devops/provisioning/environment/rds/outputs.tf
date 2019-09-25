output "address" {
  value = aws_db_instance.main.address
}

output "port" {
  value = aws_db_instance.main.port
}

output "id" {
  value = aws_db_instance.main.id
}

output "name" {
  value = aws_db_instance.main.name
}

output "username" {
  value = aws_db_instance.main.username
}

output "password" {
  value = random_string.db_password.result
}

output "url" {
  value = "postgres://${aws_db_instance.main.username}:${random_string.db_password.result}@${aws_db_instance.main.address}:${aws_db_instance.main.port}/${aws_db_instance.main.name}"
}
