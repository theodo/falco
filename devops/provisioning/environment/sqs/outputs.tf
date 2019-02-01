output "sqs_queue_id" {
  value = "${aws_sqs_queue.main.id}"
}

output "sqs_queue_arn" {
  value = "${aws_sqs_queue.main.arn}"
}
