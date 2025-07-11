import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    [key: string]: any;
  };
}

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() dto: CreateBookDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.booksService.createBook(dto, userId);
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    return this.booksService.getAllBooksByUser(userId);
  }
}
