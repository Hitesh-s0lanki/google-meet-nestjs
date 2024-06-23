import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createUserDto: CreateUserDto) {

    const user = await this.prisma.user.findUnique({
      where:{email:createUserDto.email}
    })

    if(user){
      return this.prisma.user.update({
          where:{id:user.id},
          data:{access_token: createUserDto.access_token}
      })
    }

    return this.prisma.user.create({data:createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
