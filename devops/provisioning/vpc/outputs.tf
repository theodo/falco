output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnets" {
  value = aws_subnet.public.*.id
}

output "private_subnets" {
  value = aws_subnet.private.*.id
}

output "bastion_sg" {
  value = aws_security_group.bastion.id
}

output "bastion_ip" {
  value = aws_eip.bastion.public_ip
}
