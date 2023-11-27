<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateEmployeRequest;

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
 
    public function update(Request $request, Employe $employe){
        $request->validate([
            'name'=>'required',
            'salary' => 'required',
            'age' => 'required',
        ]);
        $employe->fill($request->post())->update();
        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    public function destroy(Employe $employe)
    {
        return response($employe->delete());
    }
}