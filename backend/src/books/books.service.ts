import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(dto: CreateBookDto, userId: string) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        year: dto.year,
        genre: dto.genre,
        userId: userId,
      },
    });
  }

  async getAllBooksByUser(userId: string) {
    return this.prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
