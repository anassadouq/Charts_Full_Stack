<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

class EmployeController extends Controller
{
    public function index()
    {
        return response(Employe::all());
    }

    public function store(Request $request)
    {
        return response(Employe::create($request->all()));
    }

    public function show(Employe $employe){
        return response()->json([
            'employe' => $employe
        ]);
    }
 
    public function update(Request $request, Employe $employe){
        $employe->update($request->all());
        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    public function destroy(Employe $employe)
    {
        return response($employe->delete());
    }
}
