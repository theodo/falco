resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(local.common_tags, {
    Name = var.project_name
  })
}

# Subnets

resource "aws_subnet" "private" {
  count             = local.az_count
  vpc_id            = aws_vpc.main.id
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  cidr_block        = cidrsubnet(var.vpc_cidr_block, ceil(log(local.total_subnet_count, 2)), count.index)

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.private.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

resource "aws_subnet" "public" {
  count             = local.az_count
  vpc_id            = aws_vpc.main.id
  availability_zone = element(data.aws_availability_zones.available.names, count.index)
  cidr_block        = cidrsubnet(var.vpc_cidr_block, ceil(log(local.total_subnet_count, 2)), local.az_count + count.index)

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.public.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

# Routing

resource "aws_eip" "nat" {
  count = local.az_count
  vpc   = true

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.nat-eip.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

resource "aws_nat_gateway" "main" {
  count         = local.az_count
  allocation_id = element(aws_eip.nat.*.id, count.index)
  subnet_id     = element(aws_subnet.public.*.id, count.index)

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.nat-gateway.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

resource "aws_route_table" "private" {
  count  = local.az_count
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = element(aws_nat_gateway.main.*.id, count.index)
  }

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.private-rt.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

resource "aws_route_table_association" "private" {
  count          = local.az_count
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = element(aws_route_table.private.*.id, count.index)
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.common_tags, {
    Name = var.project_name
  })
}

resource "aws_route_table" "public" {
  count  = local.az_count
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.public-rt.${element(data.aws_availability_zones.available.names, count.index)}"
  })
}

resource "aws_route_table_association" "public" {
  count          = local.az_count
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = element(aws_route_table.public.*.id, count.index)
}

# Bastion

resource "aws_security_group" "bastion" {
  name   = "${var.project_name}-bastion"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  tags = local.common_tags
}

data "aws_ami" "bastion" {
  owners      = ["amazon"]
  most_recent = true

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  tags = local.common_tags
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.bastion.id
  instance_type = "t3.micro"

  key_name               = var.key_pair
  subnet_id              = element(aws_subnet.public.*.id, 0)
  vpc_security_group_ids = [aws_security_group.bastion.id]

  tags = merge(local.common_tags, {
    Name = "${var.project_name}-bastion"
  })
}

resource "aws_eip" "bastion" {
  instance = aws_instance.bastion.id
  vpc      = true

  tags = merge(local.common_tags, {
    Name = "${var.project_name}.bastion"
  })
}
