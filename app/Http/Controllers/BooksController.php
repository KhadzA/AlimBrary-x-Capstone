<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Books;

class BooksController extends Controller
{

    //Add
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'genre' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:10240'
        ]);


        $originalName = null;
        $pdfName = null;

        if ($request->hasFile('image')) {
            $originalName = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('books_image', $originalName, 'public');
        }

        if ($request->hasFile('pdf')) {
            $pdfName = $request->file('pdf')->getClientOriginalName();
            $request->file('pdf')->storeAs('books_pdf', $pdfName, 'public');
        }

        $book = Books::create([
            'title' => $request->title,
            'author' => $request->author,
            'genre' => $request->genre,
            'image' => $originalName,
            'pdf' => $pdfName,
        ]);

        return response()->json($book, 201);
    }

    //Delete
    public function destroy($id)
    {
        $book = Books::findOrFail($id);

        if ($book->image) {
            Storage::disk('public')->delete('books_image/' . $book->image);
        }

        if ($book->pdf) {
            Storage::disk('public')->delete('books_pdf/' . $book->pdf);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted']);
    }

    //Update
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'genre' => 'required|string',
        ]);

        $book = Books::findOrFail($id);
        $book->update($request->only('title', 'author', 'genre'));

        return response()->json($book);
    }

    public function index()
    {
        return response()->json(Books::all());
    }
}
